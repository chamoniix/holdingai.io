export default function PrivacyPolicy() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
      
      <p className="text-white/60 mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
        <p>
          HOLDINGAI LTD (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by holdingai.io.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
        <p>
          We may collect the following types of information when you interact with our website:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and any details you provide via our contact forms.</li>
          <li><strong>Usage Data:</strong> Information on how the website is accessed and used, including IP addresses, browser types, and pages visited (via analytics).</li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
        <p>
          We use the collected information for various purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain our Service.</li>
          <li>To notify you about changes to our Service.</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To monitor the usage of our Service and detect, prevent, and address technical issues.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">4. Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">5. Your Rights (GDPR)</h2>
        <p>
          If you are a resident of the European Economic Area (EEA) or the UK, you have certain data protection rights. HOLDINGAI LTD aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
        </p>
        <p>
          If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us at <a href="mailto:info@holdingai.io" className="text-brand-cyan hover:underline">info@holdingai.io</a>.
        </p>
      </section>
    </>
  );
}
