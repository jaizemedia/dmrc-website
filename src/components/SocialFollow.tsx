const SocialFollow: React.FC = () => {
  return (
    <section id="social" className="mt-10 mb-5 lg:my-20">
      {/* Light container without dark overlay */}
      <div className="mx-auto text-center px-5">
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

        {/* Image showcase */}
        <div className="mt-10">
          <img
            src="/images/social-preview.png" // Replace with your image path
            alt="Social media preview"
            className="rounded-2xl mx-auto w-full max-w-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialFollow;
