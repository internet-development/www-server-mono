import styles from '@components/MarketingServerMono.module.scss';

import * as React from 'react';

import ActionItem from '@system/documents/ActionItem';
import IntDev from '@system/svg/IntDev';

import { H3, P, Title, SubText } from '@system/typography';

export default function MarketingServerMono(props) {
  const videoUrl = 'https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/2316285a-4e2e-4f39-b578-1b0c9cdb7e93.mp4';
  const releaseUrl = 'https://github.com/internet-development/www-server-mono/releases';
  const releaseDate = '06-20-2025';
  const releaseVersion = '0.0.8';

  return (
    <>
      <div className={styles.root}>
        <div className={styles.row}>
          <div className={styles.left}>
            <P>SERVER MONO</P>
            <P>REGULAR WEIGHT</P>
            <P>SIL OPEN FONT LICENSE 1.1</P>
          </div>
          <div className={styles.right}></div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <div className={styles.content}>
            <P>
              Server Mono is a typeface inspired by typewriters, Apple's San Francisco Mono, ASCII art, command-line interfaces, and programming tools.
              <br />
              <br />
              Server Mono continues the long tradition of monospace fonts, renowned for their versatility in command-line interfaces due to their clear readability and uniform
              character width. You'll notice our own preferences reflected in the design, as we value how it performs across various viewing contexts. Server Mono offers excellent
              readability and pairs well with its uniform, predictable, and orderly appearance.
              <br />
              <br />
              We anticipate that Server Mono will be a valuable choice for your websites, game worlds, and custom desktop application interfaces, especially where precise alignment
              is essential.
            </P>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.content}>
            <Title>Downloads</Title>
            <ActionItem style={{ marginTop: `1rem` }} icon={`⊹`} href={releaseUrl} target="_blank">
              [{releaseVersion}] [{releaseDate}] Latest release
            </ActionItem>
            <ActionItem icon={`⭢`} href="https://github.com/internet-development/www-server-mono" target="_blank">
              View repository on GitHub
            </ActionItem>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.content}>
            <P>
              This single-weight font was released in 2024 by the Internet Development Studio Company of Seattle, Washington. Created by designers Tim Vanhille and Matthieu
              Salvaggio, with supplemental direction from Jimmy Lee and the Internet Development Studio Company community.
              <br />
              <br />
              In 2025, Caidan Williams joined the Internet Development Studio, taking ownership of Server Mono to add missing glyphs and help maintain the project.
            </P>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <div className={styles.left} style={{ borderRight: `1px solid var(--theme-border)` }}>
            <Title>Regular</Title>
            <P style={{ marginTop: `1rem` }}>
              Mi sina alta mappa ëa, lómëa coivië, lómëa lúmë, á tyelë, á auta mi i sáma lómë, liëa olassëar ar ilyë lúmët elenaië.
              <br />
              <br />
              Neldë Cormar Eldain arani úmë i ëari,
              <br />
              Otso Naucor arani úmë i ononti tánar,
              <br />
              Nertë Fírë Atanin nahtaina na caranwa,
              <br />
              Minë i Morna Heru úmë i morna mahalma
              <br />
              i Nórë Mordor yassë i Laitar marar.
              <br />
              Minë Corma náce ta ilyë, Minë Corma hirë ta ilyë,
              <br />
              Minë Corma yá ta ilyë ar i mornië satina te
              <br />i Nórë Mordor yassë i Laitar marar.
            </P>
          </div>
          <div className={styles.right}>
            <Title style={{}}>Regular Oblique</Title>
            <P style={{ marginTop: `1rem`, fontStyle: 'oblique' }}>
              Mi sina alta mappa ëa, lómëa coivië, lómëa lúmë, á tyelë, á auta mi i sáma lómë, liëa olassëar ar ilyë lúmët elenaië.
              <br />
              <br />
              Neldë Cormar Eldain arani úmë i ëari,
              <br />
              Otso Naucor arani úmë i ononti tánar,
              <br />
              Nertë Fírë Atanin nahtaina na caranwa,
              <br />
              Minë i Morna Heru úmë i morna mahalma
              <br />
              i Nórë Mordor yassë i Laitar marar.
              <br />
              Minë Corma náce ta ilyë, Minë Corma hirë ta ilyë,
              <br />
              Minë Corma yá ta ilyë ar i mornië satina te
              <br />i Nórë Mordor yassë i Laitar marar.
            </P>
          </div>
        </div>

        <hr className={styles.divider} style={{ marginTop: 0 }} />

        <div className={styles.row}>
          <div className={styles.quote}>
            <div className={styles.quoteLeft}>
              <H3>“</H3>
            </div>
            <div className={styles.quoteRight}>
              <H3>
                Just as the scientist must think and experiment alternately, so the artist, the author and the scholar must alternate creation or study with participation in the
                life around them.”
              </H3>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <div className={styles.content}>
            <Title>Basic Latin</Title>
            <P style={{ marginTop: `1rem`, lineHeight: `1.6rem` }}>
              {`
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z`}
            </P>

            <Title style={{ marginTop: `2rem` }}>Diacritics</Title>
            <P style={{ marginTop: `1rem`, lineHeight: `1.6rem` }}>
              {`Á Ă Â Ä À Ā Ą Å Ã Æ Ć Č Ç Ċ Ď Đ É Ě Ê Ë Ė È Ē Ə Ğ Ģ Ġ Ħ Í Î Ï İ Ì Ī Į Ķ Ĺ Ľ Ļ Ł Ń Ň Ņ Ñ Ó Ô Ö Ò Ő Ō Ø Õ Œ Þ Ŕ Ř Ŗ Ś Š Ş Ș ẞ Ť Ţ Ț Ú Û Ü Ù Ű Ū Ų Ů Ẃ Ŵ Ẅ Ẁ Ý Ŷ Ÿ Ỳ Ź Ž Ż
á ă â ä à ā ą å ã á ă â ä à ā ą å ã æ ć č ç ċ ď đ ð é ě ê ë ė è ē ę ğ ģ ġ ğ ģ ġ ħ ı í î ï ì ī į ȷ ķ ĺ ľ ļ ł ń ň ņ ñ ó ô ö ò ő ō ø õ œ þ ŕ ř ŗ ś š ş ș ß ť ţ ț ú û ü ù ű ū ų ẃ ŵ ẅ ẁ ý ÿ ỳ ŷ ź ž ż`}
            </P>

            <Title style={{ marginTop: `2rem` }}>Numbers</Title>
            <P style={{ marginTop: `1rem`, lineHeight: `1.6rem` }}>
              {`
0 1 2 3 4 5 6 7 8 9 ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ½ ¼ ¾ ⅛ ⅜ ⅝ ⅞`}
            </P>

            <Title style={{ marginTop: `2rem` }}>Symbols</Title>
            <P style={{ marginTop: `1rem`, lineHeight: `1.6rem` }}>
              {`
. , : ; … ! ¡ ? ¿ * # / \\ - – — _ ( ) { } [ ] ‚ „ “ ” ‘ ’ « » ‹ › @ & $ | ¦
`}
            </P>

            <Title style={{ marginTop: `2rem` }}>Math (WIP)</Title>
            <P style={{ marginTop: `1rem`, lineHeight: `1.6rem` }}>
              {`
+ - = ~ % < >
`}
            </P>
            <Title style={{ marginTop: `2rem` }}>ASCII</Title>
            <P style={{ marginTop: `1rem`, whiteSpace: 'pre-wrap', lineHeight: 1, fontSize: 12 }}>
              {`

 ▄████████    ▄███████▄ ███    █▄  
███    ███   ███    ███ ███    ███ 
███    █▀    ███    ███ ███    ███ 
███          ███    ███ ███    ███ 
███        ▀█████████▀  ███    ███ 
███    █▄    ███        ███    ███ 
███    ███   ███        ███    ███ 
████████▀   ▄████▀      ████████▀  

`}
              {`

███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗ 
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ████╗ ████║██╔═══██╗████╗  ██║██╔═══██╗
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 

`}
            </P>
          </div>
        </div>

        <hr className={styles.divider} />

        <a className={styles.footer} href="https://internet.dev">
          <video className={styles.video} src={videoUrl} autoPlay muted loop playsInline preload="auto">
            Your browser does not support the video tag.
          </video>
        </a>
      </div>
    </>
  );
}
