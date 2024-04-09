import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function ResearchComponent() {
    return (
      <Accordion type="single" collapsible className="w-full text-white border-0 bg-[#1A1A1A] px-3 rounded-xl border-b-0 border-[#1A1A1A]">
        <AccordionItem value="item-1">
<div className="flex flex-row justify-between items-center">
    <p className="font-semibold">Get AI</p>
<AccordionTrigger className="flex flex-row text-sm"><p className="mx-2">4 steps completed</p></AccordionTrigger>
         
    </div>      
          <AccordionContent>
          research plan shown here
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    )
  }
  