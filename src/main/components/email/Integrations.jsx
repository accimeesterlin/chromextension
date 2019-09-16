import React from "react";
import Content from "../common/content/Content";
import CardComponent from "../../molecules/card/Card";

import { integrateGmail } from '../../../utils/integrationUtils';

const IntegrationComponent = (props) => {
  const listOfIntegrations = [
    { title: "Gmail", isEnable: true, status: 'Enable', integrateService: integrateGmail },
    { title: "Yahoo", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "Outlook", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "Zoho Mail", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "GMX", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "ProtoMail", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "AOL Mail", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "Yandex Mail", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "Tutanota", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
    { title: "ICloud Mail", isEnable: false, status: 'Disabled', integrateService: integrateGmail },
  ];
  return (
    <Content className="email integrations" {...props}>
      {listOfIntegrations.map((el, idx) => (
        <CardComponent key={idx} {...el}/>
      ))}
    </Content>
  );
};

export default IntegrationComponent;
