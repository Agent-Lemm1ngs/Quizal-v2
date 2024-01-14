import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col  ">
      <div className="w-full flex flex-col bg-blue-50">
        <div className="w-full flex sm:flex-row  sm:max-w-3xl mx-auto flex-col-reverse gap-5 p-5 items-center ">
          <div className="flex-grow flex-col w-full justify-center gap-5 flex items-center ">
            <h1 className="text-4xl font-bold text-blue-400">Quizal</h1>
            <p className="text-center">
              Boost your exam success and level up your learning with
              Quizal&apos;s engaging gamemodes, where you earn rewards by acing
              quizzes, participating in contests, and unlocking new levels of
              academic achievement.
            </p>
            <Link
              href="/register"
              className="btn text-blue-400 border-2 border-blue-400 font-bold text-xl w-full text-center "
            >
              Join Now
            </Link>
          </div>
          <div className="flex flex-col ">
            <Image
              src="/drawings/shapes.svg"
              width={250}
              height={250}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex sm:flex-row sm:max-w-3xl mx-auto flex-col-reverse gap-5 p-5 items-center h-full">
        <div className="flex flex-col flex-grow items-center gap-5 text-center ">
          <h1 className="text-blue-400 font-bold text-4xl">How It Works</h1>
          <p>
            Quizal is designed to help you learn in the fastest way possible.
            Choose from various study modes to learn faster, quicker and more
            effectively.
          </p>
        </div>
        <div className="flex items-center flex-col justify-center">
          <Image
            src="/drawings/checkbox.svg"
            alt="checkbox"
            width={250}
            height={250}
            className="flex mx-auto"
          />
        </div>
      </div>
      <div className="w-full bg-blue-100 flex p-10">
        <div className="w-full flex sm:flex-row sm:max-w-3xl mx-auto flex-col-reverse gap-5 p-5 items-center ">
          <div className="flex flex-col flex-grow items-center gap-5 text-center  w-full ">
            <h1 className="text-blue-400 font-bold text-4xl">Study Anything</h1>
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
