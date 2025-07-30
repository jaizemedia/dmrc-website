import React from 'react';

const About = () => {
  return (
    <section className="bg-white text-gray-800 px-6 py-12 md:px-24 lg:px-36">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Welcome to Our Church
        </h2>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
We exist not just for ourselves, but to reach the world with the good news of Jesus. - Every member is a missionary — in homes, workplaces, and the nations.        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
To reach people from every background with the life-changing message of Jesus Christ, and to lead them into a growing relationship with Him through salvation, discipleship, authentic community, and a deeper understanding of His Word and teachings.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Join Us</h3>
            <p>
We are committed to becoming more like Jesus - not just in belief, but in practice, We don't stop at salvation - we walk with people as they grow deeper in faith, maturity, and purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
