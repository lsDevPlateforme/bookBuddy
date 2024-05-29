import TypingAnimation from "../magicui/typing-animation";
import { buttonVariants } from "../ui/button";

export const Hero = () => {
  return (
    <section className="bg-gray-50" id="home">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <TypingAnimation text="Welcome in your own library" duration={100} />

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className={buttonVariants({ variant: "default", size: "lg" })}
              href="#"
            >
              Get Started
            </a>

            <a
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
