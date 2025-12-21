export default function TermsPage() {
  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <section className="space-y-4 text-sm leading-relaxed">
        <p>
          By using this application, you agree to the following terms and
          conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Image Upload & Usage
        </h2>
        <p>
          Images uploaded to this platform are used solely for breed detection
          purposes. We do not claim ownership of your images.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          2. Machine Learning Disclaimer
        </h2>
        <p>
          Breed predictions are generated using a machine learning model and
          may not always be 100% accurate. Results should be considered
          informational only.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          3. Rate Limiting
        </h2>
        <p>
          To ensure fair usage and system stability, prediction requests may be
          rate-limited. Excessive requests can result in temporary blocking.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          4. Service Availability
        </h2>
        <p>
          We do not guarantee uninterrupted access. The service may be updated,
          modified, or temporarily unavailable.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          5. Liability
        </h2>
        <p>
          We are not responsible for decisions made based on the information
          provided by this application.
        </p>
      </section>
    </div>
  );
}
