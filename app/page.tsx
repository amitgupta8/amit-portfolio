import { Hero } from "@/components/Hero";
import { RecruiterBar } from "@/components/RecruiterBar";
import { Snapshot } from "@/components/Snapshot";
import { About, Services, Process, Achievements, RecruiterCTA } from "@/components/Sections";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { BuildWorkflow } from "@/components/BuildWorkflow";
import { TechUniverse } from "@/components/TechUniverse";

export default function Home() {
    return <><Hero /><RecruiterBar /><Snapshot /><About /><Services /><BuildWorkflow /><Skills /><TechUniverse /><Experience compact /><Process /><Projects /><Achievements /><Education /><Contact /><RecruiterCTA /></>;
}
