import { CloudUpload, Share2, Shield, Lock, Zap, Users } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About File-sharing</h1>
      
      <div className="mb-12 text-center">
        <p className="text-xl mb-4">
          File-sharing is your go-to platform for seamless and secure file management. 
          We make it easy to upload, save, and share your files in one place.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg">
          <a href="/">Get Started</a>
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {[
          { icon: CloudUpload, title: "Easy Upload", description: "Drag and drop your files or use our intuitive interface to upload quickly and easily." },
          { icon: Shield, title: "Secure Storage", description: "Your files are stored in state-of-the-art cloud infrastructure." },
          { icon: Share2, title: "Easy Sharing", description: "Share your files securely " }
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <feature.icon className="mr-2" />
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-8 rounded-lg mb-12">
        <h2 className="text-3xl font-semibold mb-4">Why Choose File-sharing?</h2>
        <ul className="space-y-4">
          {[
            { icon: Lock, text: "Clerk Authentication for Security" },
            { icon: Zap, text: "fast upload and download speeds" },
            { icon: Users, text: "Share file friends and family" }
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <item.icon className="mr-2 text-blue-600" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}