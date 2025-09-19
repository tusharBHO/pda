// app/profile/page.tsx
export default function ProfilePage() {
    return (
        <div className="w-full px-40 p-6 bg-gray-50 py-20">
            <h1 className="text-black font-bold text-3xl">User Profile</h1>
            {/* User Profile Header */}
            <div className="flex items-center space-x-6">
                <img
                    src="/images/profile.jpg" // replace with actual image
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-black text-2xl font-bold">Emily Carter</h1>
                    <p className="text-gray-600">Farm Manager</p>
                    <p className="text-gray-500 text-sm">Joined 2021</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="mt-10">
                <h2 className="text-black text-lg font-semibold mb-4">Contact Information</h2>
                <div className="border-t border-gray-200 divide-y divide-gray-200">
                    <div className="flex items-center space-x-10 py-3">
                        <span className="font-medium text-gray-700 w-32 text-sm">Email</span>
                        <span className="text-gray-600 text-sm">emily.carter@email.com</span>
                    </div>
                    <div className="flex items-center space-x-10 py-3">
                        <span className="font-medium text-gray-700 w-32 text-sm">Phone</span>
                        <span className="text-gray-600 text-sm">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-10 py-3">
                        <span className="font-medium text-gray-700 w-32 text-sm">Address</span>
                        <span className="text-gray-600 text-sm">123 Farm Lane, Anytown, USA</span>
                    </div>
                </div>
            </div>


            {/* Permissions */}
            <div className="mt-10">
                <h2 className="text-black text-lg font-semibold mb-4">Permissions</h2>
                <div className="border-t border-gray-200">
                    <div className="flex items-center space-x-10 py-3">
                        <span className="font-medium text-gray-700 w-32 text-sm">Role</span>
                        <span className="text-gray-600 text-sm">Administrator</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
