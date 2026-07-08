export default function TermsAndConditions() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Terms & Conditions</h1>
      
      <p className="text-white/60 mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
        <p>
          These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and HOLDINGAI LTD (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the holdingai.io website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;).
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">3. User Representations</h2>
        <p>
          By using the Site, you represent and warrant that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>All registration or contact information you submit will be true, accurate, current, and complete.</li>
          <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
          <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
          <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
          <li>You will not use the Site for any illegal or unauthorized purpose.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">4. Governing Law</h2>
        <p>
          These conditions are governed by and interpreted following the laws of the United Kingdom, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law of your country of residence.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-white">5. Contact Us</h2>
        <p>
          In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
        </p>
        <p className="mt-4">
          <strong>HOLDINGAI LTD</strong><br />
          Lytchett House, Freeland Park<br />
          Wareham Road, Poole<br />
          Dorset, BH16 6FA, UK<br />
          Email: <a href="mailto:info@holdingai.io" className="text-brand-cyan hover:underline">info@holdingai.io</a><br />
          Phone: <a href="tel:+447537106967" className="text-brand-cyan hover:underline">+44 7537 106967</a>
        </p>
      </section>
    </>
  );
}
