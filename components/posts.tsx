export function Posts({posts}) {
    return (
        <main>
            {posts.map(p => (
                <article key={p.title}>
                    <div>
                      {p.title}
                    </div>
                    <div>
                      {p.date}
                    </div>
                    <div>
                      {p.spoiler}
                    </div>
                </article>
            ))}
        </main>
    );
}
