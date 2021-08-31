## Spectacular Karaoke!

This page will document the entire section of the design of a software solution to provide a Karaoke service. The name of the project will be "Spectacular Karaoke".

The requirements at a general level are the following:

1. The user must authenticate through Forms and the system validates it against its own user database
2. User can add / delete / modify existing songs and lyrics. This is only allowed for premium users.
3. The user must be able to search through a list of songs, the one they want to play. You can search for it by song name, artist, album, and lyric snippets.
4. The user can play a song for which the Karaoke application will stream the audio and synchronize the lyrics so that the user can sing to the rhythm of the music. 

### System context diagram

It shows the software system being built and how it fits into the world in termos of the people who use it and the other software systems it interacts with. The solution is shown below: 
[image](https://github.com/Josecespedesant/SpectacularKaraoke/blob/gh-pages/syscontxdiagram.png?raw=true)

As seen in the image, the user interacts with the karaoke system allowing him/her/they to interact with songs and lyrics. This system also interacts with a cloud storage that is Google Cloud Storage to extract the songs data.


```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Josecespedesant/SpectacularKaraoke/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.
