import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const WaitlistEmail = () => {
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Shuten Waitlist</title>
          <Preview>Thanks for joining the Shuten waitlist.</Preview>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap');
            `}
          </style>
        </Head>
        <Body
          className="bg-[#09090B] py-[40px]"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          <Container className="bg-[#18181B] rounded-[8px] mx-auto p-[40px] max-w-[600px]">
            <Section className="text-center">
              <Text
                className="text-[28px] text-white mt-0 mb-[16px]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                }}
              >
                You are in the{" "}
                <span className="font-bold text-[#FAFAFA]">Shuten</span>{" "}
                waitlist!
              </Text>

              <Text
                className="text-[16px] text-[#A1A1AA] mb-[24px]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                }}
              >
                The last backend you'll ever need
              </Text>

              <hr className="border-solid border-[#27272A] my-[24px] w-[80px] mx-auto" />
            </Section>

            <Section>
              <Text className="text-[16px] leading-[26px] text-[#A1A1AA] italic mb-[20px]">
                <span className="text-[24px] text-[#71717A] mr-[4px]">"</span>
                We're building something different. We're redefining what
                software can be. And how it gets built. No complexity. No
                compromise.
                <span className="text-[24px] text-[#71717A] ml-[4px]">"</span>
              </Text>

              <Text className="text-[16px] leading-[26px] text-[#E4E4E7] mb-[20px]">
                You'll be amongst the first to know when we launch!
              </Text>

              <Text className="text-[16px] leading-[26px] text-[#E4E4E7] mb-[32px]">
                We'll reach out when we're ready to show you what's possible.
              </Text>

              <Text className="text-[16px] leading-[26px] text-[#E4E4E7]">
                Until then,
                <br />
                <span className="font-semibold">The Shuten Team</span>
              </Text>

              <Text className="text-[15px] text-[#A1A1AA]">
                P.S. Curious about who's building this? Check out{" "}
                <Link
                  href="https://saishuu.ai"
                  className="text-[#E4E4E7] underline"
                >
                  saishuu.ai
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WaitlistEmail;
