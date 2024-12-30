import { useEffect, useState } from "react";
import { isFullscreenStore, responsiveStore } from "../stores";
import FullScreenGuide from "./FullScreenGuide";
import GlobalStyles from "../styles/globalstyles.styles";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import Cursor from "./Cursor";
import AnimatedOutlet from "./AnimatedOutlet";
import chalk from "chalk";
import { useTheme } from "styled-components";
import { useMediaQuery } from "react-responsive";

const welcomeText = `
         ,---._      ,----..            ,--.                 ,---._                   ,--.               
       .-- -.' \\    /   /   \\         ,--.'|               .-- -.' \\    ,---,       ,--.'|               
       |    |   :  /   .     :    ,--,:  : |               |    |   :,\`--.' |   ,--,:  : |         ,--,  
       :    ;   | .   /   ;.  \\,\`--.'\`|  ' :               :    ;   ||   :  :,\`--.'\`|  ' :       ,'_ /|  
       :        |.   ;   /  \` ;|   :  :  | |               :        |:   |  '|   :  :  | |  .--. |  | :  
       |    :   :;   |  ; \\ ; |:   |   \\ | :               |    :   :|   :  |:   |   \\ | :,'_ /| :  . |  
       :         |   :  | ; | '|   : '  '; |               :         '   '  ;|   : '  '; ||  ' | |  . .  
       |    ;   |.   |  ' ' ' :'   ' ;.    ;               |    ;   ||   |  |'   ' ;.    ;|  | ' |  | |  
   ___ l         '   ;  \\; /  ||   | | \\   |           ___ l         '   :  ;|   | | \\   |:  | | :  ' ;  
 /    /\\    J   : \\   \\  ',  / '   : |  ; .'         /    /\\    J   :|   |  ''   : |  ; .'|  ; ' |  | '  
/  ../  \`..-    ,  ;   :    /  |   | \`--'          /  ../  \`..-    ,'   :  ||   | \`--'  :  | : ;  ; |  
\\    \\         ;    \\   \\ .'   '   : |              \\    \\         ; ;   |.' '   : |      '  :  \`--'   \\ 
 \\    \\      ,'      \`---\`     ;   |.'               \\    \\      ,'  '---'   ;   |.'      :  ,      .-./ 
  "---....--'                  '---'                  "---....--'            '---'         \`--\`----'     
`;

interface CursorPosition {
  x: number;
  y: number;
}

const Layout = () => {
  const theme = useTheme();
  const [cursorPos, setCursorPos] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { isFullscreen, setIsFullscreen } = isFullscreenStore();
  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      console.log("full");
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    window.document.addEventListener(
      "fullscreenchange",
      handleFullScreenChange
    );
    return () => {
      window.document.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  useEffect(() => {
    console.log(chalk.hex(theme.colors.textPoint)(welcomeText));
  }, []);

  const responsive = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const { isResponsive, setIsResponsive } = responsiveStore();

  useEffect(() => {
    setIsResponsive(responsive);
    setIsFullscreen(true);
  }, [responsive]);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!isFullscreen && !isResponsive && <FullScreenGuide key="fullscreen" />}
      </AnimatePresence>
      {!isResponsive && <Cursor {...cursorPos} />}
      <Header />
      <AnimatePresence mode="wait">
        <AnimatedOutlet />
      </AnimatePresence>
    </>
  );
};

export default Layout;
