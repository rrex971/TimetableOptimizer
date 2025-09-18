import Navbar from "../components/Navbar";
const Contact = () => {
    return (
        <div className="min-h-screen bg-bg-800">
                <Navbar />
                <div className="px-12 py-8">
                  <h1 className="text-4xl font-bold text-white mb-8">Contact</h1>
                  <div className="text-white text-2xl">Contact us at:
                    <ul className="list-disc list-inside mt-4">
                        <li className="text-lg">Email:
                            <a href="mailto:contact@example.com" className="text-blue-400 hover:underline"> contact@example.com</a>
                        </li>
                        <li className="text-lg">Phone: 
                            <a href="tel:+911234567890" className="text-blue-400 hover:underline">+91 12345-67890</a>
                        </li>

                    </ul>
                  </div>
                </div>
              </div>
    );
};

export default Contact;