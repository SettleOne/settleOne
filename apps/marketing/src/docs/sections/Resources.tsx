import React from "react";
import { PageHeader, Section, Paragraph, Callout } from "../components/DocsUI";

export function License() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="License" description="Important licensing information for SettleOne." />
      <Section title="Business Source License">
        <Paragraph>SettleOne is not released under the MIT License.</Paragraph>
        <Paragraph>Unless a repository or component explicitly states otherwise, SettleOne source code is intended to be distributed under the Business Source License 1.1 (BUSL-1.1) or the applicable repository-specific license.</Paragraph>
        <Callout type="warning" title="Check the Repository">
          The license for each repository must be checked in that repository's LICENSE file. BUSL-1.1 is intended to provide source availability while restricting certain forms of production use according to the specific license terms and change date defined by the applicable licensed work.
        </Callout>
        <Paragraph>Do not assume that public source code means unrestricted commercial use. Third-party dependencies, libraries, protocols, SDKs, and integrations remain subject to their own respective licenses and terms.</Paragraph>
      </Section>
    </div>
  );
}
