import React from "react";

import { Container, Segment } from "semantic-ui-react";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

function SocialMediaButtons(props) {
  return (
    <>
      <Container>
        <Segment>
          <LinkedinShareButton
            url={"http://www.camperstribe.com"}
            quote={"partager ...."}
            hashtag="@React"
          >
            <LinkedinIcon>logoFillColor="white" round={true}</LinkedinIcon>
          </LinkedinShareButton>
          <FacebookShareButton
            url={"http://www.camperstribe.com"}
            quote={"partager ...."}
            hashtag="@React"
          >
            <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
          </FacebookShareButton>

          <WhatsappShareButton
            url={"http://www.camperstribe.com"}
            title="Sharing content"
          >
            <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
          </WhatsappShareButton>

          <TelegramShareButton
            url={"http://www.camperstribe.com"}
            title="Sharing content"
          >
            <TelegramIcon>logoFillColor="white" round={true}</TelegramIcon>
          </TelegramShareButton>
        </Segment>
      </Container>
    </>
  );
}
export default SocialMediaButtons;
