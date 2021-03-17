import withSeo from "@/select/seo";

const stage = withSeo(({ meta, data }) => {
  return {
    stage: meta.floor,
    scheme: data.current_floor.floor_plan,
    deg: data.current_floor.compas_degree,
    flats: data.current_floor.placements,
    entrance: meta.section,
    section: meta.section,
    section_is_through: meta.is_through,
    stages: data.floors,
    house: meta.building,
    viewBox: data.current_floor.floor_plan_viewbox,
    views: data.current_floor.views
  };
});

export default stage;
