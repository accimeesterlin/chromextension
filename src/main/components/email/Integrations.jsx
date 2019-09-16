import React from "react";
import Content from "../common/content/Content";
import CardComponent from "../../molecules/card/Card";

const IntegrationComponent = () => {
  const listOfIntegrations = [
    { title: "Gmail", isEnable: true, status: 'Enable' },
    { title: "Yahoo", isEnable: false, status: 'Disabled' },
    { title: "Outlook", isEnable: false, status: 'Disabled' },
    { title: "Zoho Mail", isEnable: false, status: 'Disabled' },
    { title: "GMX", isEnable: false, status: 'Disabled' },
    { title: "ProtoMail", isEnable: false, status: 'Disabled' },
    { title: "AOL Mail", isEnable: false, status: 'Disabled' },
    { title: "Yandex Mail", isEnable: false, status: 'Disabled' },
    { title: "Tutanota", isEnable: false, status: 'Disabled' },
    { title: "ICloud Mail", isEnable: false, status: 'Disabled' },
  ];
  return (
    <Content className="email integrations">
      {listOfIntegrations.map((el, idx) => (
        <CardComponent key={idx} {...el}/>
      ))}
    </Content>
  );
};

export default IntegrationComponent;
