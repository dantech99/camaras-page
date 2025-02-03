import { Chip } from "@nextui-org/chip";
import React from "react";

export function SomosPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row sm: flex-col-reverse items-center max-w-7xl mx-auto p-4 rounded-lg">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              src="https://placekitten.com/600/600"
              alt="Team"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              ¿Quienes <span className="text-yellow-400">Somos</span>?
            </h2>
            <p className="text-white mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              finibus laoreet velit. Sed nec bibendum arcu. Duis dapibus nibh
              elit, vitae blandit arcu bibendum ac. Maecenas mattis, neque in
              aliquet facilisis, augue urna sagittis mauris, nec efficitur risus
              erat ac eros. Cras ut ex efficitur, ultrices quam eget, dictum
              libero. Etiam eu vehicula orci. Sed tincidunt porta risus, sit
              amet vestibulum est porttitor sed.
            </p>
            <p className="text-white mb-4 leading-relaxed">
              Mauris elit nulla, tincidunt vitae nibh mollis, tincidunt dapibus
              augue. Nulla id sem vel ligula luctus commodo. Praesent ac ante
              vel quam mattis porttitor ut sed est. Maecenas ac nibh nec nibh
              laoreet mattis. Nunc ultricies sapien ut mauris tincidunt
              convallis. Pellentesque a tempus erat. Praesent sed eros pulvinar,
              congue elit id, tristique felis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
