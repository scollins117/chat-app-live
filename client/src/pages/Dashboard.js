import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGES } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_MESSAGES);
  const messages = data?.messages || [];
  console.log(messages);
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              messages={messages}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
