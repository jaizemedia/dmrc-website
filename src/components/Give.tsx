const Give: React.FC = () => {
  return (
    <section
      id="give"
      className="mt-10 mb-5 lg:my-20 max-h-[580px] overflow-hidden"
    >
      <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
        <div className="h-full w-full">
          {/* Background Grid + Gradient */}
          <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="rounded-3xl absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
          </div>

          {/* Content */}
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-5 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-2">
              If you feel led to bless this church financially, please use the link below.
            </h2>

            <p>
              <a
                href="https://donate.stripe.com/3cs8AzeVxc8se1W5kk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full px-6 py-3 transition duration-300 ease-in-out shadow-md"
              >
                GIVE
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Give
