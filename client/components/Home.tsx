import * as React from 'react';

const Home: React.FC = () => {
  return (
    <div className="relative px-6 lg:px-8 bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl pb-8">
            Seasoning
          </h1>
          <h1 className="text-xl font-regular tracking-tight text-gray-900 sm:text-6xl">
            A recipe book for any time of year
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create a recipe book of all your favorite recipes in one convenient
            place. Simple design allows you to easily parse through the
            information without the distraction of a food blogger's life story.
            Create, edit, and delete with ease!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/create"
              className="bg-gradient-to-r from-emerald-700 to-emerald-500 inline-block px-6 py-2.5 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:text-white"
            >
              Create now
            </a>
            <a
              href="/*"
              className="text-base font-semibold leading-7 text-gray-900"
            >
              Sign up <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="italic font-light pt-5">
            Recommendations based upon your current season and weather coming
            soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
