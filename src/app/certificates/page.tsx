import { Container } from "@/components/Container";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const { certificates } = await getContent();

  return (
    <Container>
      <section className="py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Certificates</h1>
          <p className="mt-4 text-lg leading-8 text-ink-300">
            A record of certifications, credentials, and learning milestones that support my engineering work.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {certificates.length ? (
            certificates.map((certificate) => (
              <article
                key={`${certificate.title}-${certificate.issuedAt}`}
                className="glass rounded-3xl p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{certificate.title}</h2>
                    <p className="mt-2 text-accent-200">{certificate.issuer}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-ink-200">
                    {certificate.issuedAt}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 text-sm text-ink-300">
                  {certificate.credentialId ? (
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">
                      Credential ID: {certificate.credentialId}
                    </span>
                  ) : null}
                  {certificate.pdfUrl ? (
                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 font-medium text-white hover:bg-white/10"
                    >
                      Open PDF
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className="glass rounded-3xl p-6 text-ink-300">
              No certificates yet.
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
