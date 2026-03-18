import { cn } from "@/utilities";
import Section from "@/components/section";

export default function HomePage() {
  return (
    <>
      <h1 className="flex-center pt-4">Welcome!</h1>
      <div className={cn("flex-center", "my-4")}>
        <Section>
          <h3 className="mb-2">Primary section.</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ad, fuga facilis cum possimus nostrum id voluptates. Doloremque quibusdam consectetur, enim ut neque facere commodi eius at totam magnam quae.
            Nam optio quibusdam libero distinctio reprehenderit officia ex eum quasi velit, impedit vero. Possimus, fugiat. Eveniet quasi labore molestiae enim, ullam dolore recusandae amet nihil quas quaerat obcaecati pariatur officiis.</p>
        </Section>
      </div>

      <div className={cn("flex-center", "my-4")}>
        <Section variant="secondary">
          <h3 className="mb-2">Secondary section.</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ad, fuga facilis cum possimus nostrum id voluptates. Doloremque quibusdam consectetur, enim ut neque facere commodi eius at totam magnam quae.
            Nam optio quibusdam libero distinctio reprehenderit officia ex eum quasi velit, impedit vero. Possimus, fugiat. Eveniet quasi labore molestiae enim, ullam dolore recusandae amet nihil quas quaerat obcaecati pariatur officiis.</p>
        </Section>
      </div>

      <div className={cn("flex-center", "my-4")}>
        <Section variant="disabled">
          <h3 className="mb-2">Disabled section.</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ad, fuga facilis cum possimus nostrum id voluptates. Doloremque quibusdam consectetur, enim ut neque facere commodi eius at totam magnam quae.
            Nam optio quibusdam libero distinctio reprehenderit officia ex eum quasi velit, impedit vero. Possimus, fugiat. Eveniet quasi labore molestiae enim, ullam dolore recusandae amet nihil quas quaerat obcaecati pariatur officiis.</p>
        </Section>
      </div>
    </>
  )
}
