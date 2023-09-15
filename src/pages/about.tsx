import FollowBlock from "@/components/FollowBlock/FollowBlock";

function About() {
  return (
    <>
      <div
        className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: "url(../../static/img/aboutBg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="md:-mt-[70px] font-bold text-5xl text-white font-Din">
          About
        </h2>
      </div>
      <div className="container">
        <div className="md:p-[30px] py-[20px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
          <div className="tb:mr-[30px] w-full font-light text-lg leading-6 font-Din text-[#363636]">
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
          <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
            <div className="mt-[30px] tb:mt-[0]">
              <FollowBlock />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
