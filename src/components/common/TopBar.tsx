export default function TopBar() {
  return (
    <div className="bg-[#5c4a3d] text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <span>B2B Vietnam Pottery Manufacturer & Exporter</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#c9a87c] transition-colors">Login</a>
          <a href="#" className="hover:text-[#c9a87c] transition-colors">Account</a>
        </div>
      </div>
    </div>
  )
}
