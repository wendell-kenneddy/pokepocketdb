import { SidebarAccordionTrigger } from "./sidebar-accordion-trigger";
import { SidebarLink } from "./sidebar-link";
import * as Accordion from "@radix-ui/react-accordion";

export function Sidebar() {
  return (
    <aside className="h-full w-full bg-gray-900 border-r border-gray-800 p-4">
      <Accordion.Root type="multiple" asChild>
        <nav className="w-full flex flex-col items-start gap-4">
          <Accordion.Item value="expansions">
            <SidebarAccordionTrigger path="/expansions">Expansions</SidebarAccordionTrigger>

            <Accordion.Content className="flex mt-1 flex-col items-start gap-1">
              <SidebarLink href="/dashboard/expansions">View expansions</SidebarLink>
              <SidebarLink href="/dashboard/expansions/create">Create expansion</SidebarLink>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="cards">
            <SidebarAccordionTrigger path="/cards">Cards</SidebarAccordionTrigger>

            <Accordion.Content className="flex mt-1 flex-col items-start gap-1">
              <SidebarLink href="/dashboard/cards">View cards</SidebarLink>
              <SidebarLink href="/dashboard/cards/create">Create card</SidebarLink>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="matches">
            <SidebarAccordionTrigger path="/matches">Matches</SidebarAccordionTrigger>

            <Accordion.Content className="flex mt-1 flex-col items-start gap-1">
              <SidebarLink href="/dashboard/matches">View match results</SidebarLink>
              <SidebarLink href="/dashboard/matches/create">Create match result</SidebarLink>
            </Accordion.Content>
          </Accordion.Item>
        </nav>
      </Accordion.Root>
    </aside>
  );
}
