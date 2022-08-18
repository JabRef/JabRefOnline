<template>
  <Head>
    <Meta
      http-equiv="x-ua-compatible"
      content="IE=edge"
    />
    <Meta
      name="description"
      content="A free reference manager that helps you to discover, collect, organize and cite your scholarly literature and research in an efficient way."
    />

    <Meta
      property="og:locale"
      content="en_US"
    />
    <Meta
      property="og:type"
      content="website"
    />
    <Meta
      property="og:title"
      content="JabRef - Free Reference Manager - Stay on top of your Literature"
    />
    <Meta
      property="og:description"
      content="JabRef is a free reference manager that helps you to discover, collect, organize and cite your scholarly literature and research in an efficient way."
    />
    <Meta
      property="og:site_name"
      content="JabRef"
    />
    <Meta
      property="og:url"
      content="https://www.jabref.org/"
    />
    <Meta
      property="og:image"
      content="https://www.jabref.org/assets/jabref-mainscreen.png"
    />

    <Meta
      name="twitter:card"
      content="summary_large_image"
    />
    <Meta
      name="twitter:site"
      content="@JabRef_org"
    />
    <Meta
      name="twitter:domain"
      content="jabref.org"
    />
    <Meta
      name="twitter:title"
      content="JabRef - Free Reference Manager - Stay on top of your Literature"
    />
    <Meta
      name="twitter:description"
      content="JabRef is a free reference manager that helps you to discover, collect, organize and cite your scholarly literature and research in an efficient way."
    />
    <Meta
      property="twitter:image"
      content="https://www.jabref.org/assets/jabref-mainscreen.png"
    />

    <Link
      rel="canonical"
      href="https://www.jabref.org/"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-16.png"
      sizes="16x16"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-20.png"
      sizes="20x20"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-32.png"
      sizes="32x32"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-40.png"
      sizes="40x40"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-48.png"
      sizes="48x48"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-64.png"
      sizes="64x64"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-128.png"
      sizes="128x128"
    />
    <Link
      rel="icon"
      type="image/png"
      href="/img/JabRef-icon-256.png"
      sizes="256x256"
    />
    <Link
      rel="shortcut icon"
      href="/favicon.ico"
    />

    <Title>
      JabRef - Free Reference Manager - Stay on top of your Literature
    </Title>

    <Script type="application/ld+json">
      { "@context": "https://schema.org", "@type": "SoftwareApplication",
      "name": "JabRef", "operatingSystem": "Windows, OS X, Linux",
      "applicationCategory": "https://schema.org/EducationalApplication",
      "applicationSubCategory": "Reference manager", "downloadUrl":
      "https://downloads.jabref.org/", "featureList":
      "https://www.jabref.org/#features", "screenshot":
      "https://www.jabref.org/assets/jabref-mainscreen.png", "offers": {
      "@type": "Offer", "price": "0" } }
    </Script>
    <Script type="application/ld+json">
      { "@context": "https://schema.org/", "@type": "Product", "name": "JabRef",
      "image": ["https://www.jabref.org/assets/jabref-mainscreen.png"],
      "description": "JabRef is a free reference manager that helps you to
      discover, collect, organize and cite your scholarly literature and
      research in an efficient way.", "brand": { "@context":
      "https://schema.org", "@type": "Organization", "url":
      "https://www.jabref.org/", "logo":
      "https://www.jabref.org/img/JabRef-icon-256.png", "name": "JabRef" },
      "offers": { "@type": "Offer", "price": "0" } }
    </Script>
  </Head>

  <div class="flex flex-wrap">
    <div class="min-h-screen w-full flex flex-col">
      <header>
        <slot name="header">
          <NavBar />
        </slot>
      </header>
      <main class="relative h-full overflow-hidden">
        <div class="grow py-6 h-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
