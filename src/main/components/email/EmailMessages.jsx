import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Grid, CardContent } from "@material-ui/core";
import { isEmpty } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const EmailMessages = ({ fetchMoreData, messages, resultSizeEstimate }) => {
  const [label, setLabel] = useState("Central Suppport");

  const displayGmailSubject = payload => {
    let subject = "No Subject found!!!";

    if (payload && payload.headers) {
      payload.headers.map(element => {
        if (element.name.toLowerCase() === "subject") {
          subject = element.value;
        }
      });
    }

    return subject;
  };

  if (isEmpty(messages)) return null;

  const hasMore = messages.length < resultSizeEstimate;


  // JSX
  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {messages.map(({ payload }, index) => (
        <Card className="template-card">
          <CardContent id="template-card__content">
            <Grid container justify="space-between" alignItems="center">
              <Grid>
                <p>
                  <b>{index + 1}</b> -{displayGmailSubject(payload)}
                </p>
              </Grid>
              <Grid className="template-card__buttons">
                <Button onClick={this.handleClose} color="primary">
                  Copy
                </Button>
                <Button onClick={this.addTemplate} color="primary">
                  Edit
                </Button>

                <Button onClick={this.addTemplate} color="primary">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </InfiniteScroll>
  );
};

EmailMessages.propTypes = {
    fetchMoreData: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired
};

export default EmailMessages;
