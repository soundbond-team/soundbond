import React from "react";
import { Container, Segment } from "semantic-ui-react";
import "../AudioPlayer/AudioPlayer";
import "../Post/Post";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";


function SocialMediaButtons(props) {
  
  return (
    <>
      <Container>
         <Segment>
          <FacebookShareButton
            url={"http://www.camperstribe.com"}
            title="Sharing content">
          <FacebookIcon logoFillColor="white" round={true} size={50}></FacebookIcon>
          </FacebookShareButton>
          
          <WhatsappShareButton
            url={"http://www.camperstribe.com"}
            title="Sharing content">
            <WhatsappIcon logoFillColor="white" round={true} size={50}></WhatsappIcon>
          </WhatsappShareButton>

           <TelegramShareButton
            url={"http://www.camperstribe.com"}
            title="Sharing content">
           <TelegramIcon logoFillColor="white" round={true} size={50}></TelegramIcon>
          </TelegramShareButton>

          <LinkedinShareButton
            url="https://github.com/mdn/translated-content/blob/main/files/fr/web/api/url/createobjecturl/index.md"
            title="Sharing content">
          <LinkedinIcon logoFillColor="white" round={true} size={50}></LinkedinIcon>
          </LinkedinShareButton>

          <TwitterShareButton
             url="https://github.com/mdn/translated-content/blob/main/files/fr/web/api/url/createobjecturl/index.md"
            title="Sharing content">
            <TwitterIcon logoFillColor="white" round={true} size={50}></TwitterIcon>
          </TwitterShareButton>
          </Segment>
      </Container>
      
    </>
  );
}
export default SocialMediaButtons;
