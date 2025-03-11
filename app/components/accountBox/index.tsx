import { useState, type PropsWithChildren } from 'react';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { motion, type MotionProps } from 'framer-motion';
import { AccountContext } from './accountContext'
import { styled } from 'styled-components';

const BoxContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[280px] min-h-[550px] flex flex-col rounded-[19px] bg-white shadow-[0_0_2px_rgba(15,15,15,0.28)] relative overflow-hidden">
      {children}
    </div>
  );
};

const TopContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[250px] flex flex-col justify-end px-[1.8em] pb-[5em]">
      {children}
    </div>
  );
};

const BackDrop = ({ children, initial, animate, exit }: PropsWithChildren<MotionProps>) => {
  return (
    <motion.div className="absolute w-[160%] h-[550px] flex flex-col border-full top-[-290px] left-[-70px] rotate-[60deg] bg-gradient-to-r from-primary to-blue-300" initial={initial} animate={animate} variants={backdropVariants} transition={expandingTransition}>
      {children}
    </motion.div>
  );
};
const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      {children}
    </div>
  );
};

const HeaderText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[30px] font-semibold leading-[1.24] text-white z-10">
      {children}
    </div>
  );
};

const SmallText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[11px] font-medium text-white mt-[7px] z-10">
      {children}
    </div>
  );
};

const InnerContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col px-[20px]">
      {children}
    </div>
  );
};

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)"
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)"
  }
}

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
}

export default function AccountBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  const playExpandingAnimation = () => {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  }

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  }

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  }

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop 
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && <HeaderContainer>
            <HeaderText>Welcome</HeaderText>
            <HeaderText>Back</HeaderText>
            <SmallText>Please sign-in to continue!</SmallText>
          </HeaderContainer>}
          {active === "signup" && <HeaderContainer>
            <HeaderText>Create</HeaderText>
            <HeaderText>Account</HeaderText>
            <SmallText>Please sign-up to continue!</SmallText>
          </HeaderContainer>}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
        </InnerContainer>
      </BoxContainer>
      </AccountContext.Provider>
  );
}