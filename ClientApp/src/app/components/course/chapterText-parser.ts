import {CourseChapter} from 'examination/entities';

export class ChapterTextParser {
  index: number = 0;

  get length(): number {
    return this.text.length;
  }

  constructor(private text: string) { }

  parse(): CourseChapter[] {
    const chapters = [];

    if(!this.text) {
      return chapters;
    }

    while (this.index < this.length) {
      chapters.push(this.getChapter());
    }


    return chapters;
  }

  getChapter(): CourseChapter {
    const chapter = new CourseChapter();

    if (this.current === '#') {
      this.next();
      if (this.current === '#') {
        this.next();
        chapter.description = this.getText();
      } else {
        chapter.title = this.getText();
        chapter.description = this.getChapter().description;
      }
    }

    return chapter;
  }

  getText(): string {
    let text = '';
    while (this.hasMore && this.current !== '#') {
      text = text + this.current;
      this.next();
    }

    text = this.handleText(text);
    return text;
  }

  handleText(text: string): string {
    let result = '';
    let index = 0;
    let open = false;

    while (index < text.length) {
      if (text[index] === '$') {
        if (open) {
          open = false;
          result += '</i>';
        } else {
          open = true;
          result += '<i>';
        }
      } else {
        result += text[index]
      }
      index++;
    }


    return result;
  }

  get hasMore(): boolean {
    return this.index < this.length;
  }

  get current(): string {
    return this.text[this.index];
  }

  next(): void {
    this.index += 1;
  }

}
