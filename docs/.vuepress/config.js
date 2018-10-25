module.exports = {
  title: "Agrimonia's Wiki",
  description: "This wiki shares my skills mastered and knowledges learned",
  serviceWorker: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "CSS", link: "/CSS/" },
      { text: "blog", link: "https://agrimonia.me" }
    ],
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "agrimonia/wiki",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助改善此页面！",
    displayAllHeaders: true
  }
};
