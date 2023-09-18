import FollowBlock from "@/components/FollowBlock/FollowBlock";
/* import SmallPostCard from "@/components/SmallPostCard/SmallPostCard"; */
import Image from "next/image";
import test from "static/img/test.png";

function Post() {
  return (
    <div className="container ">
      <div className="flex w-full flex-col tb:flex-row bg-white border-t-2 border-solid border-[#B3B3B3] pt-[25px]">
        <div className="tb:mr-[30px] w-full">
          <h2 className="font-bold text-3xl leading-8 flex items-center text-[#002C47] font-Din">
            How the Brain Distinguishes Memories From Perceptions
          </h2>
          <span className="font-light text-base leading-5 flex items-center text-blue-700 font-Din my-[15px]">
            From the journals
          </span>
          <div className="font-light  text-[12px] md:text-sm leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[8px]">
            <span>March 03, 2022</span>
            <span>|</span>
            <span>By James White</span>
          </div>
          <Image src={test} alt="banner" className="w-full my-[20px]" />
          <div className="font-light text-lg leading-6 items-center font-Din text-[#363636]">
            <p>
              Lorem ipsum dolor sit amet consectetur. Ultricies euismod dui
              neque sollicitudin nibh semper sit. Sodales a etiam mi quisque
              amet. Et ac sed tellus tempus odio turpis nisl nunc vitae. Ut enim
              morbi in massa netus vestibulum. Donec fames ac lacinia dis
              ultrices. Ullamcorper elementum nunc suscipit sed dictum posuere
              sagittis. Egestas faucibus arcu porttitor vitae ullamcorper duis
              nunc euismod nam. Sit condimentum vitae scelerisque nam adipiscing
              scelerisque enim. Amet amet sit etiam blandit nunc risus viverra.
              Porta ornare feugiat felis mauris ac eget. Nulla integer nulla
              mauris id.
            </p>
            <br />
            <p>
              Integer imperdiet ipsum morbi volutpat vel arcu. Turpis quam
              tortor viverra pretium. Purus dictum purus fermentum viverra.
              Suspendisse pellentesque sed gravida libero pulvinar facilisis
              neque donec ante. Gravida a interdum nulla ac. Feugiat eu
              ullamcorper eget sit felis non. Nibh enim sed suspendisse faucibus
              dui. Amet nulla pretium non elementum sagittis aliquam vel.
            </p>
            <br />
            <p>
              Iaculis enim vel molestie praesent sit ultrices. Pellentesque
              tincidunt tristique in scelerisque ullamcorper amet egestas
              libero. Enim iaculis mi tellus vitae cursus vel. Maecenas in
              egestas ipsum auctor arcu eu mi quis. Enim interdum at euismod a
              sit ipsum sed egestas sed. Auctor et non quisque id turpis
              condimentum faucibus in suspendisse. Sem non etiam aliquam non ut.
              Ac est sociis mus ante. Auctor pretium quis purus morbi faucibus
              mattis auctor. Arcu rutrum pharetra adipiscing senectus id
              malesuada turpis dictum sed. Nunc varius tincidunt fames non
              gravida justo. Augue phasellus porta lectus hendrerit aliquet
              pharetra laoreet. Blandit pellentesque nunc condimentum fames
              eleifend nunc urna.
            </p>
            <br />
            <p>
              Eget metus sapien nunc aliquet ut id. Quis in facilisi lectus at
              amet. Et viverra sit blandit faucibus mattis laoreet senectus.
              Volutpat varius donec quam posuere ut a platea. Non fermentum
              velit tempus mauris nulla vivamus. Scelerisque mi nunc scelerisque
              orci nisl suspendisse in lectus nibh. Ut varius tempus nisl donec
              et consectetur.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
          <div className="mt-[30px] tb:mt-[0]">
            <FollowBlock />
          </div>
          <div>
            <h6 className="font-light text-2xl leading-7 flex items-center text-[#002C47] font-Din mt-[30px] mb-[25px]">
              Recomend
            </h6>
            {/*   <SmallPostCard />
            <SmallPostCard />
            <SmallPostCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
