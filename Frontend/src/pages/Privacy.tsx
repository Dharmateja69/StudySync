import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-10 px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: July 1, 2025
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
              <CardDescription>
                How we protect and manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                At StudySync ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
              </p>
              <p>
                By accessing or using StudySync, you consent to the practices described in this Privacy Policy. If you do not agree with the practices described here, please do not use our services.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h3>2.1 Personal Information</h3>
              <p>
                We may collect the following types of personal information:
              </p>
              <ul>
                <li>Contact information (name, email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information (educational institution, professional role, profile picture)</li>
                <li>Payment information (processed through secure third-party payment processors)</li>
              </ul>
              
              <h3>2.2 Content Information</h3>
              <p>
                We collect information from the content you upload, create, or share on our platform, including:
              </p>
              <ul>
                <li>PDFs and documents you upload for analysis</li>
                <li>Images you submit for text extraction</li>
                <li>Web links you share for summarization</li>
                <li>Code snippets you create or share</li>
                <li>Notes, comments, and other content you create</li>
              </ul>
              
              <h3>2.3 Usage Information</h3>
              <p>
                We automatically collect certain information about your use of our platform, including:
              </p>
              <ul>
                <li>Log data (IP address, browser type, pages visited, time spent)</li>
                <li>Device information (device type, operating system)</li>
                <li>Feature usage statistics</li>
                <li>Performance data and error reports</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>Providing and improving our services</li>
                <li>Processing and analyzing content you upload</li>
                <li>Personalizing your experience and recommendations</li>
                <li>Managing your account and subscription</li>
                <li>Communicating with you about our services</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Maintaining the security and integrity of our platform</li>
                <li>Analyzing usage patterns to enhance our features</li>
                <li>Enforcing our terms of service</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. Sharing Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul>
                <li>With service providers who help us operate our platform</li>
                <li>With other users when you explicitly share content or participate in collaborative features</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>In connection with a business transfer, merger, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. AI Processing and Data Usage</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Our platform uses artificial intelligence (AI) to analyze and process the content you upload. By using our AI-powered features, you should understand:
              </p>
              <ul>
                <li>Content you upload may be processed by our AI systems to generate summaries, extract information, or provide other insights.</li>
                <li>We may use anonymized and aggregated data from user content to improve our AI models and enhance our services.</li>
                <li>We implement technical and organizational measures to protect the confidentiality of your content during AI processing.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>Accessing and reviewing your personal information</li>
                <li>Correcting inaccurate or incomplete information</li>
                <li>Deleting your personal information</li>
                <li>Restricting or objecting to certain processing activities</li>
                <li>Requesting a copy of your personal information in a portable format</li>
                <li>Withdrawing consent for processing based on consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in Section 10.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the appropriate retention period, we consider:
              </p>
              <ul>
                <li>The amount, nature, and sensitivity of the information</li>
                <li>The potential risk of harm from unauthorized use or disclosure</li>
                <li>The purposes for which we process the information</li>
                <li>Whether we can achieve those purposes through other means</li>
                <li>Applicable legal, regulatory, tax, accounting, or other requirements</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Our Services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete such information.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p>
                Email: privacy@studysync.com<br />
                Address: 123 Innovation Drive, Suite 400, San Francisco, CA 94107
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>11. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The most current version will always be posted on our website with the effective date. We encourage you to review this Privacy Policy periodically.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}