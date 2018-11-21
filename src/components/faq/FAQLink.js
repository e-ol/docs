import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import getPostExcerpt from '../../utils/post-excerpt'
import { Spirit } from '../../styles/spirit-styles'

const FAQLink = (props) => {
    const post = props.post
    const url = `/faq/${post.slug}/`
    const excerpt = getPostExcerpt(post)

    return (
        <Link to={ url } className={ `f5 db tdn mb6 faq-question bb b--whitegrey` }>
            <h4 className={`${Spirit.excerpt} link darkgrey fw5`} to={url}>{post.title} &raquo;</h4>
            {excerpt ? <p className={`${Spirit.small}ma0 f8 lh-copy middarkgrey mb6`}>{excerpt}</p> : null}
        </Link>
    )
}

FAQLink.propTypes = {
    post: PropTypes.object.isRequired,
}

export default FAQLink
