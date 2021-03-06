import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import { Layout } from '../../components/common/layout'
import { Spirit } from '../../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../../components/common/meta'
import { FAQLink, FAQTagList } from '../../components/faq'

class FAQTags extends React.Component {
    render() {
        const posts = this.props.data.allGhostPost.edges
        const { tagURL, tagName, tagDescription, tagImage, tagMetaTitle, tagMetaDescription, section } = this.props.pageContext

        const title = tagMetaTitle || `FAQ - ${tagName} - Ghost`
        const description = tagMetaDescription || tagDescription || ``
        const imageUrl = tagImage || getMetaImageUrls(section)

        return (
            <>
                <MetaData
                    data={this.props.data}
                    location={this.props.location}
                    type="series"
                    title={title}
                    description={description}
                    image={imageUrl}
                />
                <Layout headerDividerStyle="shadow">
                    <div className="bg-faq bb b--whitegrey">
                        <div className={ Spirit.page.xl + `pt-vw7 pt-vw1-ns pb-vw1` }>
                            <h1 className={ Spirit.h4 + `white` }>
                                <Link to="/faq/" className={ `link dim white fw3` }>Frequently Asked Questions</Link>
                                <span className="white titleslash-white pl4 ml4 relative">
                                    <Link to={tagURL} className="link dim white">{tagName}</Link>
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className={ Spirit.page.xl + `grid-12 pb5` }>
                        <div className="bg-white shadow-2 br4 mt10 pa5 pa15-ns pt10-ns pb12-ns col-12 col-8-ns">
                            {/* <h4 className={ Spirit.h2 + `col-12 pb2 bb b--whitegrey mb5` }>{ tagName }</h4> */}
                            { posts.map(({ node }) => (
                                <FAQLink key={ node.id } post={ node } />
                            )) }
                        </div>
                        <div className="col-12 col-4-ns pa5 pa15-ns pt10-ns mt11-ns">
                            <FAQTagList location={ this.props.location } />
                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}

FAQTags.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.shape({
        section: PropTypes.string.isRequired,
        tagName: PropTypes.string.isRequired,
        tagURL: PropTypes.string.isRequired,
        tagDescription: PropTypes.string,
        tagMetaDescription: PropTypes.string,
        tagMetaTitle: PropTypes.string,
        tagImage: PropTypes.string,
    }).isRequired,
}

export default FAQTags

export const tagsQuery = graphql`
    query($tagSlug: String!) {
        site {
            ...SiteMetaFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            limit: 100,
            filter: {tags: {elemMatch: {slug: {eq: $tagSlug}}}}
        ) {
            edges {
                node {
                    ...GhostPostListFields
                }
            }
        }
    }
`
