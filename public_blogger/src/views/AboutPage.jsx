export default function About() {
  return (
    <>
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Blogger profile picture"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mt-4">
                Hello, I'm Ravi Zarazka Putra
              </h2>
              <p className="text-gray-600 mt-2">
                Blogger &amp; Content Creator
              </p>
            </div>
            <div className="mt-8 text-gray-700">
              <p className="mb-4">
                Welcome to my blog! I'm a passionate writer and creator who
                loves to share insights about [topics you're passionate about].
                Over the years, I have written numerous posts covering [related
                topics], aiming to inspire and inform readers with valuable
                content.
              </p>
              <p className="mb-4">
                In this space, you will find articles on [main blogging
                categories], tips on [niche topic], and personal experiences
                that I hope will resonate with you.
              </p>
              <p>
                Feel free to explore my blog, leave comments, and connect with
                me on social media. I look forward to sharing more with you!
              </p>
            </div>
            <div className="text-center mt-8">
              <button className="btn btn-primary">
                Follow Me on Social Media
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
