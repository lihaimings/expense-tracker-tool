import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="section bg-gradient-subtle">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about Expense Tracker
            </p>
          </div>
          
          {/* FAQ List */}
          <div className="space-y-4">
            
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            How do I log my expenses?
          </h3>
          <p className="text-gray-600">
            Enter your expense date and amount, then select the category
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Can I export my expenses?
          </h3>
          <p className="text-gray-600">
            Yes, you can export your expenses as a CSV file
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Is Expense Tracker secure?
          </h3>
          <p className="text-gray-600">
            Yes, our tool uses SSL encryption to protect user data
          </p>
        </div>

          </div>
          
          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions?
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Try Expense Tracker Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
