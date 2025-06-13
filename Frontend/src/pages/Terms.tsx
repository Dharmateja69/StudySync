import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function Terms() {
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
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: July 1, 2025
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
              <CardDescription>
                Please read these terms carefully before using StudySync
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Welcome to StudySync ("we," "our," or "us"). By accessing or using our platform, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
              </p>
              <p>
                StudySync provides an AI-powered educational platform that offers various services including PDF analysis, image text extraction, web content summarization, and collaborative learning tools ("Services").
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                You must be at least 13 years old to use our Services. If you are under 18, you must have permission from a parent or guardian to use our Services, and they must agree to these Terms on your behalf.
              </p>
              <p>
                By using our Services, you represent and warrant that you meet all eligibility requirements we outline in these Terms.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Your Account</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p>
                You agree to notify us immediately of any unauthorized access to or use of your account. We reserve the right to terminate your account if you violate any provisions of these Terms.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. User Content</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Our Services allow you to upload, submit, store, and share content such as PDFs, images, text, and code ("User Content"). You retain all rights to your User Content, but you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, and display such User Content for the purpose of providing and improving our Services.
              </p>
              <p>
                You represent and warrant that:
              </p>
              <ul>
                <li>You own or have the necessary rights to the User Content you submit.</li>
                <li>The User Content does not violate the rights of any third party, including intellectual property rights and privacy rights.</li>
                <li>The User Content complies with these Terms and all applicable laws and regulations.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                You agree not to use our Services to:
              </p>
              <ul>
                <li>Violate any applicable law or regulation.</li>
                <li>Infringe upon the rights of others, including intellectual property rights.</li>
                <li>Upload or share content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable.</li>
                <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.</li>
                <li>Engage in any activity that could disable, overburden, or impair the proper functioning of our Services.</li>
                <li>Attempt to gain unauthorized access to our Services, systems, or networks.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                The StudySync platform, including its design, features, and content (excluding User Content), is owned by us and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use any portion of our Services without our explicit written permission.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Our Privacy Policy describes how we collect, use, and share your personal information. By using our Services, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul>
                <li>Your use or inability to use our Services.</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Any interruption or cessation of transmission to or from our Services.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to use our Services after revisions become effective, you agree to be bound by the updated Terms.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@studysync.com<br />
                Address: 123 Innovation Drive, Suite 400, San Francisco, CA 94107
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}