import Image from "next/image";
import ExpDescription from "@/components/about/exp-description";
import SkillsChart from "@/app/(root)/about/SkillsChart";

const exp = {
    descriptionDetails: {
        paragraphs: ["I am a engineer with deep experience across full-stack web development and blockchain ecosystems."],
        bullets: [
            "Full-Stack Engineer with 7+ years of experience building scalable web applications using modern frameworks like Next.js, React, and Node.js.",
            "Blockchain Specialist with hands-on expertise in smart contract development, DeFi protocols, and Web3 integration using Solidity, ethers.js, and wagmi.",
            "Strong background in TypeScript, Prisma, PostgreSQL, and API design (REST, GraphQL, tRPC).",
            "Proven ability to design and deliver end-to-end systems — from UI/UX to cloud deployment — with a focus on performance, security, and maintainability.",
            "Experience with Ethereum, Solana, and Layer 2 scaling solutions.",
            "Skilled in CI/CD pipelines, Docker, GitHub Actions, and deployment via Vercel, AWS, and Cloudflare.",
            "Lifelong learner, active in open-source, technical writing, and mentoring junior developers.",
            "Passionate about bridging Web2 and Web3 to create seamless, decentralized user experiences."
        ],
    },
};
const About = () => {
    return (
        <div className="min-h-screen w-full">
            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Avatar + Name Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                    <div className="w-36 h-36 relative rounded-full overflow-hidden shadow-lg ring-2 ring-gray-300">
                        <Image
                            src="/naman-img.jpg"
                            alt="Isaac Laurent"
                            fill
                            sizes="(max-width: 768px) 144px, 144px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-2">Isaac Laurent</h1>
                        <p className="text-lg text-gray-600">
                            Full-Stack & Blockchain Engineer
                        </p>
                        <p className="text-md text-gray-500">
                            Building scalable web apps & decentralized systems.
                        </p>
                    </div>
                </div>

                {/* Bio Section */}
                <section className="space-y-5 text-gray-800 text-lg leading-relaxed mb-10">
                    <div className="mb-7">
                        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-4">
                            Description
                        </h2>
                        <div className="bg-muted/50 rounded-lg p-6">
                            <ExpDescription
                                paragraphs={exp.descriptionDetails.paragraphs}
                                bullets={exp.descriptionDetails.bullets}
                            />
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Skills</h2>
                    <div className="bg-muted/50 rounded-lg p-6">
                        <SkillsChart />
                    </div>
                </section>

                {/* Education Section */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4">Education</h2>
                    <div className="space-y-4 text-gray-800 text-lg">
                        <div>
                            <h3 className="font-bold">B.S. in Computer Science</h3>
                            <p className="text-gray-600">EPITA · 2013 – 2018</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Certified Blockchain Developer</h3>
                            <p className="text-gray-600">Blockchain Academy · 2024</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;