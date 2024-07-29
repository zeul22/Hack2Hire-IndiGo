import React from "react";

const Footer = () => {
  const t_c = [
    {
      title: "Company",
      text: [
        {
          text: "About us",
          link: "https://www.goindigo.in/about-us.html?linkNav=About%20us%7CCOMPANY%7CFooter",
        },
        {
          text: "CSR Initiatives",
          link: "https://www.goindigo.in/csr.html?linkNav=CSR%20initiatives%7CCOMPANY%7CFooter",
        },
        {
          text: "Our People",
          link: "https://www.goindigo.in/about-us/leadership-team.html?linkNav=Our%20people%7CCOMPANY%7CFooter",
        },
        {
          text: "Investor Relations",
          link: "https://www.goindigo.in/information/investor-relations.html?linkNav=Investor%20Relations%7CCOMPANY%7CFooter",
        },
        {
          text: "InterGlobe Enterprises",
          link: "https://www.goindigo.in/information/inter-globe-enterprises.html?linkNav=InterGlobe%20Enterprises%7CCOMPANY%7CFooter",
        },
        {
          text: "Policy",
          link: "https://www.goindigo.in/information/privacy.html?linkNav=Policy%7CCOMPANY%7CFooter",
        },
      ],
    },
    {
      title: "Support",
      text: [
        {
          text: "Special Assistance",
          link: "https://www.goindigo.in/information/special-disability-assistance.html?linkNav=Special%20Assistance%7CSUPPORT%7CFooter",
        },
        {
          text: "Help and Contact",
          link: "https://www.goindigo.in/support.html?linkNav=Help%20and%20Contact%7CSUPPORT%7CFooter",
        },
        {
          text: "Add-ons",
          link: "https://www.goindigo.in/add-on-services.html?linkNav=Add-ons%7CSUPPORT%7CFooter",
        },
        {
          text: "IndiGo CarGo",
          link: "https://cargo.goindigo.in/",
        },
        {
          text: "Advertise with us",
          link: "https://www.goindigo.in/contact-us/query-form-alliances.html?linkNav=Advertise%20with%20us%7CSUPPORT%7CFooter",
        },
        {
          text: "FAQ's",
          link: "https://www.goindigo.in/travel-information/en.html?linkNav=FAQ%27s%7CSUPPORT%7CFooter",
        },
      ],
    },
    {
      title: "Quick Links",
      text: [
        {
          text: "Download App",
          link: "https://www.goindigo.in/information/mobile.html?linkNav=Download%20app%7CQUICK%20LINKS%7CFooter",
        },
        {
          text: "Web Check-in advisory",
          link: "https://www.goindigo.in/web-check-in.html?linkNav=Web%20check-in%20advisory%7CQUICK%20LINKS%7CFooter",
        },
        {
          text: "Conditions of carriage",
          link: "https://www.goindigo.in/information/conditions-of-carriage.html?linkNav=Conditions%20of%20carriage%7CQUICK%20LINKS%7CFooter",
        },
        {
          text: "Flight Schedule",
          link: "https://www.goindigo.in/check-flight-status.html?linkNav=Flight%20schedule%7CQUICK%20LINKS%7CFooter",
        },
        {
          text: "Purchase requirement",
          link: "https://www.goindigo.in/information/purchase-requirement.html?linkNav=Purchase%20requirement%7CQUICK%20LINKS%7CFooter",
        },
        {
          text: "Tariff Sheet",
          link: "https://www.goindigo.in/content/dam/skyplus6e/in/en/assets/global/documents/IndiGo_Tariff_Sheet_2024-07-27.pdf",
        },
        {
          text: "Refune claim",
          link: "https://www.goindigo.in/initiate-refund.html?linkNav=Refund%20claim%7CQUICK%20LINKS%7CFooter",
        },
      ],
    },
    {
      title: "Media",
      text: [
        {
          text: "Press Release",
          link: "https://www.goindigo.in/press-releases.html?linkNav=Press%20releases%7CMEDIA%7CFooter",
        },
        {
          text: "Our Awards",
          link: "https://www.goindigo.in/about-us/awards.html?linkNav=Our%20awards%20%7CMEDIA%7CFooter",
        },
        {
          text: "Testimonials",
          link: "https://www.goindigo.in/customer-testimonial.html?linkNav=Testimonials%7CMEDIA%7CFooter",
        },
        {
          text: "Hello 6E Magazine",
          link: "https://www.goindigo.in/campaigns/hello-6e.html?linkNav=Hello%206E%20Magazine%7CMEDIA%7CFooter",
        },
      ],
    },
  ];
  return (
    <div className="mt-16 min-h-[400px] rounded-t-xl w-full bg-gradient-to-b from-blue-800 to-blue-950  ">
      <div className="md:h-[150px] h-[50px]"></div>
      <div className="p-2 bg-white text-blue-900 -right-8 md:-right-11 absolute rotate-90">
        Share Feedback
      </div>
      <div className="hidden md:flex md:flex-row mx-12 justify-between px-6 text-white uppercase tracking-tighter">
        <div>Company</div>
        <div>Support</div>
        <div>Quick Links</div>
        <div>Media</div>
        <div>Download App</div>
      </div>

      <div className="visible md:hidden">
        <div className="space-y-4 p-12">
          <div></div>
          {t_c.map((item, index) => (
            <details
              key={index}
              className=" group [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="text-sm flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  p-1  text-white">
                <h2 className="font-medium">{item.title}</h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="flex flex-col gap-1">
                {item.text.map((subitem, index2) => (
                  <a
                    className="mt-1 px-4 leading-relaxed text-white"
                    target="_blank"
                    href={subitem.link}
                    key={index2}
                  >
                    {subitem.text}
                  </a>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="md:hidden my-6 flex justify-between px-6 text-white">
        <div className="uppercase">Social media</div>
        <div className="flex gap-2">
          <div className="bg-white rounded-full p-1">
            <img
              className="h-6 "
              src="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
            />
          </div>
          <div className="bg-white rounded-full p-1">
            <img
              className="h-6 "
              src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
            />
          </div>
          <div className="bg-white rounded-full p-1">
            <img
              className="h-6 "
              src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
            />
          </div>
          <div className="bg-white rounded-full p-1">
            <img
              className="h-6 "
              src="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
            />
          </div>
        </div>
      </div>
      <div className="md:h-[150px]"></div>
      <div className="hidden md:flex flex-row gap-6  justify-between mt-2 tracking-tighter px-2 text-sm text-gray-200">
        <div>Site map</div>
        <div>Privacy Policy</div>
        <div>Terms & Conidtions</div>
        <div>Cookie Policy</div>
        <div>Cyber Security</div>
        <div>Disclaimer</div>
        <div></div>
        <div>+917065145858</div>
      </div>
      <div className="flex px-2 justify-between text-gray-400 tracking-tighter text-sm">
        <div>@Copyright 2024 IndiGo All rights reserved.</div>
        <div>Connect with us on Whatsapp</div>
      </div>
    </div>
  );
};

export default Footer;
