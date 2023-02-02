import css from './HomeBanner.module.css';

function HomeBanner() {
  return (
    <section className="hero has-text-centered">
      <div className="mt-6">
        <p className={'title ' + css.gt_title_big}>ventil≋AR</p>
        <p className="subtitle">sponsored by</p>
        <div className={css.gt_logo}></div>
      </div>
    </section>
  );
}

export default HomeBanner;
