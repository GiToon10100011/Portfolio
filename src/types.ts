export interface IProject {
  id: string;
  date: string;
  deploymentUrl: string;
  repoURL: string;
  title: string;
  subtitle: string;
  mainBg: string;
  thumbnailImg: string;
  thumbnailContent: string;
  modalImg: string;
  modalTroubleshooting: string[];
  pages: IPage[];
  stacks: string[];
  comments: IComment[];
}

interface IPage {
  title: string;
  content: string;
  video: string;
  poster: string;
}

interface IComment {
  id: string;
  username: string;
  content: string;
  password: string;
}
