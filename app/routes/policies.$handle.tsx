import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {type Shop} from '@shopify/hydrogen/storefront-api-types';

type SelectedPolicies = keyof Pick<
  Shop,
  'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
>;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `SmartSphere | ${data?.policy.title ?? ''}`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(
    /-([a-z])/g,
    (_: unknown, m1: string) => m1.toUpperCase(),
  ) as SelectedPolicies;

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  return {policy};
}

export default function Policy() {
  const {policy} = useLoaderData<typeof loader>();

  // Function to get the emoji icon for the policy
  const getPolicyIcon = (handle: any) => {
    if (handle.includes('privacy')) return '🔒';
    if (handle.includes('shipping')) return '🚚';
    if (handle.includes('refund')) return '↩️';
    if (handle.includes('terms')) return '📝';
    if (handle.includes('subscription')) return '🔄';
    return '📋';
  };

  return (
    <div
      style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '40px 24px 60px',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          fontSize: '14px',
          color: '#3D8BFF',
          marginBottom: '32px',
        }}
      >
        <Link
          to="/"
          style={{
            color: '#3D8BFF',
            textDecoration: 'none',
            marginRight: '8px',
          }}
        >
          Home
        </Link>
        <span style={{margin: '0 8px', color: '#71C3FF'}}>/</span>
        <Link
          to="/policies"
          style={{
            color: '#3D8BFF',
            textDecoration: 'none',
            marginRight: '8px',
          }}
        >
          Policies
        </Link>
        <span style={{margin: '0 8px', color: '#71C3FF'}}>/</span>
        <span style={{color: '#2B2B2B'}}>{policy.title}</span>
      </div>

      {/* Back Button */}
      <div style={{marginBottom: '32px'}}>
        <Link
          to="/policies"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#3D8BFF',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#2D7BEE';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#3D8BFF';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{marginRight: '8px'}}
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to All Policies
        </Link>
      </div>

      {/* Policy Header */}
      <div
        style={{
          marginBottom: '40px',
          borderBottom: '1px solid #EAEAEA',
          paddingBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <span style={{fontSize: '32px', marginRight: '16px'}}>
            {getPolicyIcon(policy.handle)}
          </span>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#2B2B2B',
              margin: 0,
            }}
          >
            {policy.title}
          </h1>
        </div>

        <p
          style={{
            fontSize: '16px',
            color: '#2B2B2B',
            maxWidth: '800px',
            lineHeight: '1.6',
          }}
        >
          Last updated on{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Policy Content */}
      <div
        style={{
          color: '#2B2B2B',
          lineHeight: '1.8',
          fontSize: '16px',
        }}
        className="policy-content"
      >
        <div
          dangerouslySetInnerHTML={{__html: policy.body}}
          style={{
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              color: '#2B2B2B',
              marginTop: '32px',
              marginBottom: '16px',
              fontWeight: '600',
            },
            '& h2': {fontSize: '24px'},
            '& h3': {fontSize: '20px'},
            '& p': {
              marginBottom: '16px',
              lineHeight: '1.8',
            },
            '& ul, & ol': {
              paddingLeft: '24px',
              marginBottom: '24px',
            },
            '& li': {
              marginBottom: '8px',
            },
            '& a': {
              color: '#3D8BFF',
              textDecoration: 'none',
            },
            '& strong': {
              fontWeight: '600',
            },
            '& table': {
              borderCollapse: 'collapse',
              marginBottom: '24px',
              width: '100%',
            },
            '& th, & td': {
              border: '1px solid #EAEAEA',
              padding: '12px',
              textAlign: 'left',
            },
            '& th': {
              backgroundColor: '#F8F9FA',
              fontWeight: '600',
            },
          } as any}
        />
      </div>

      {/* Contact Support Box */}
      <div
        style={{
          marginTop: '48px',
          backgroundColor: '#F8F9FA',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#2B2B2B',
            marginTop: 0,
            marginBottom: '12px',
          }}
        >
          Have questions about this policy?
        </h3>
        <p
          style={{
            fontSize: '15px',
            color: '#2B2B2B',
            marginBottom: '16px',
            lineHeight: '1.6',
          }}
        >
          Our support team is here to help clarify any part of our{' '}
          {policy.title.toLowerCase()} you may have questions about.
        </p>
        <Link
          to="/contact"
          style={{
            display: 'inline-block',
            backgroundColor: '#3D8BFF',
            color: 'white',
            fontWeight: '500',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2D7BEE';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3D8BFF';
          }}
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
` as const;
