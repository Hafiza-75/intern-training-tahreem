function Welcome ({name, hasTasks}) {
    return (
        <section>
            <h1>Welcome, {name}! </h1>

            {hasTasks ? 
            ( <p>You have tasks to complete today.</p> ) 
            : 
            ( <p>You have no tasks!</p> )
            }

        </section>
    );
}

export default Welcome;