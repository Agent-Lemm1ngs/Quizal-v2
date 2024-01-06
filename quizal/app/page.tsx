import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col  ">
      <div className="w-full flex sm:flex-row  sm:max-w-3xl mx-auto flex-col-reverse gap-5 p-5 items-center">
        <div className="flex-grow flex-col w-full justify-center gap-5 flex items-center ">
          <h1 className="text-4xl font-bold text-pink-500">Quizal</h1>
          <p className="text-center">
            Boost your exam success and level up your learning with Quizal's
            engaging gamemodes, where you earn rewards by acing quizzes,
            participating in contests, and unlocking new levels of academic
            achievement.
          </p>
          <Link
            href="/register"
            className="btn text-pink-500 border-2 border-pink-500 font-bold text-xl w-full text-center "
          >
            Join Now
          </Link>
        </div>
        <div className="flex flex-col ">
          <Image src="/logo.svg" width={250} height={250} alt="logo" />
        </div>
      </div>
      <div className="w-full flex sm:flex-row sm:max-w-3xl mx-auto flex-col-reverse gap-5 p-5 items-center">
        <div className="flex flex-col flex-grow items-center gap-5 text-center ">
          <h1 className="text-pink-500 font-bold text-4xl">How It Works</h1>
          <p>
            Quizal is designed to help you learn in the fastest way possible.
            Choose from various study modes to learn faster, quicker and more
            effectively.
          </p>
        </div>
        <div className="flex h-72 rounded w-96 bg-gray-300 animate-pulse">
          .
        </div>
      </div>
      <div className="w-full bg-pink-100 flex">
        <div className="w-full flex sm:flex-row sm:max-w-3xl mx-auto flex-col-reverse gap-5 p-5 items-center ">
          <div className="flex flex-col flex-grow items-center gap-5 text-center  w-full ">
            <h1 className="text-pink-500 font-bold text-4xl">Study Anything</h1>
            <p>
              Transform your old notes into easy-to-read flashcards that you can
              study anytime, anywhere with Quizal.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
