const SocialFollow: React.FC = () => {
  return (
    <section id="social" className="mt-10 mb-5 lg:my-20">
      <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20 text-center px-5 text-white">
        {/* Background styling for consistency */}
        <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="rounded-3xl absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold">Follow Us on Social Media</h2>
          <p className="text-lg md:text-xl">Stay connected with Disciple Makers Church and join our online community across platforms.</p>

          <div className="flex justify-center items-center space-x-4 mt-4 flex-wrap">
            <a
              href="https://www.youtube.com/@disciplemakerschurch_mk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/disciplemakerschurch.mk/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@disciplemakerschurchmk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              TikTok
            </a>
          </div>

          {/* Optional: Image showcase */}
          <div className="mt-10">
            <img
              src="/images/social-preview.png" // Replace with uploaded path
              alt="Social media preview"
              className="rounded-2xl mx-auto w-full max-w-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFollow;
