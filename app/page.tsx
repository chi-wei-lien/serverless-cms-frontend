'use client'

import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="d-flex justify-content-center">
        <div
          className="mt-5 shadow p-3 mb-5 rounded"
          style={{ width: '800px' }}
        >
          <h3>What is Simple CMS?</h3>
          <p>
            Simple CMS is a straightforward Content Management System built
            using Amazon Web Services (AWS). It leverages AWS&apos;s flexibility
            and scalability to provide a powerful yet easy-to-use CMS solution.
          </p>
          <h3>How to use?</h3>
          <p>
            Below is a simple demonstration of how to use Simple CMS, using my
            personal blog website as an example.
          </p>
          <h3>Key Functionalities</h3>
          <ul>
            <li>
              <b>Create Post Groups:</b> Organize your content into distinct
              groups.
            </li>
            <li>
              <b>Define Schema of Post Groups:</b> Customize the structure and
              format of each Post Group.
            </li>
            <li>
              <b>Create Posts Under Post Group:</b> Add content that adheres to
              the specific schema of its group.
            </li>
            <li>
              <b>Host Files (Documents, Images):</b> Easily host and integrate
              various files into other applications.
            </li>
          </ul>
          <h3>Technology</h3>
          <p>
            Curious about the technology behind Simple CMS? Here&apos;s a quick
            overview of the technologies involved:
          </p>
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <Image
              alt="tech stack diagram"
              src="/images/simple-cms.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p>
            The backend of Simple CMS is entirely serverless, utilizing various
            AWS services to ensure simplicity, flexibility, and scalability. The
            core components include:
          </p>
          <ul>
            <li>
              <b>Authentication:</b> AWS Cognito
            </li>
            <li>
              <b>Backend Logic:</b> AWS lambda
            </li>
            <li>
              <b>Database:</b> AWS DynamoDB
            </li>
            <li>
              <b>General Storage:</b> AWS S3 Bucket
            </li>
          </ul>
          <p>All Lambda functions are coded in C# (.NET).</p>
        </div>
      </div>
    </div>
  )
}
